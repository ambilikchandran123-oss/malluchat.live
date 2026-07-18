import Peer, { type DataConnection, type MediaConnection } from 'peerjs';

export type MessageType = 'text' | 'voice' | 'typing_start' | 'typing_stop' | 'reaction' | 'read' | 'public_text' | 'ad';

export type IncomingMessage = {
    id: string;
    senderId: string;
    senderName: string;
    type: MessageType;
    text?: string;
    voiceBlob?: string; // base64 encoded audio
    adImageUrl?: string; // image for ads
    reaction?: string;
    targetId?: string; // for reactions/read receipts
    replyToId?: string; // ID of the message being replied to
    replyText?: string; // Text snippet of the replied message
    timestamp: number;
    status?: 'sent' | 'delivered' | 'read';
};

export class PeerEngine {
    public peer: Peer | null = null;
    public connection: DataConnection | null = null;
    public callConnection: MediaConnection | null = null;
    public localStream: MediaStream | null = null;

    public onMessage?: (msg: IncomingMessage) => void;
    public onConnected?: () => void;
    public onDisconnected?: () => void;
    public onCallReceived?: (call: MediaConnection) => void;
    public onCallEnded?: () => void;

    public id: string = '';

    public onConnectionRequest?: (conn: DataConnection, metadata: any) => void;

    initialize(onReady: (id: string) => void, onError: (err: any) => void) {
        let id = '';
        if (typeof window !== 'undefined' && window.localStorage) {
            id = window.localStorage.getItem('malluchat_stable_peer_id') || '';
        }
        if (!id) {
            id = Math.random().toString(36).substring(2, 8).toUpperCase();
            if (typeof window !== 'undefined' && window.localStorage) {
                window.localStorage.setItem('malluchat_stable_peer_id', id);
            }
        }
        this.id = id;
        onReady(id);

        this.peer = new Peer(id, {
            debug: 1,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' },
                    { urls: 'stun:stun2.l.google.com:19302' },
                    { urls: 'stun:stun3.l.google.com:19302' },
                    { urls: 'stun:stun4.l.google.com:19302' },
                    { urls: 'stun:openrelay.metered.ca:80' },
                    {
                        urls: 'turn:openrelay.metered.ca:80',
                        username: 'openrelayproject',
                        credential: 'openrelayproject'
                    },
                    {
                        urls: 'turn:openrelay.metered.ca:443',
                        username: 'openrelayproject',
                        credential: 'openrelayproject'
                    },
                    {
                        urls: 'turn:openrelay.metered.ca:443?transport=tcp',
                        username: 'openrelayproject',
                        credential: 'openrelayproject'
                    }
                ]
            }
        });

        this.peer.on('open', (connectedId) => {
            this.id = connectedId;
            onReady(connectedId);
        });

        this.peer.on('connection', (conn) => {
            if (this.onConnectionRequest) {
                const meta = conn.metadata || (conn as any).options?.metadata;
                this.onConnectionRequest(conn, meta);
            } else if (!this.connection) {
                this.setupConnection(conn);
            } else {
                conn.close(); // already connected 1v1
            }
        });

        this.peer.on('call', (call) => {
            if (this.onCallReceived) {
                this.onCallReceived(call);
            }
        });

        this.peer.on('disconnected', () => {
            this.peer?.reconnect();
        });

        this.peer.on('error', (err: any) => {
            if (err && err.type === 'unavailable-id') {
                console.warn(`Peer ID ${id} is already in use or taken. Generating a new one...`);
                const newId = Math.random().toString(36).substring(2, 8).toUpperCase();
                if (typeof window !== 'undefined' && window.localStorage) {
                    window.localStorage.setItem('malluchat_stable_peer_id', newId);
                }
                this.peer?.destroy();
                this.initialize(onReady, onError);
                return;
            }
            onError(err);
        });

        this.peer.on('disconnected', () => {
            console.log("PeerJS disconnected. Attempting to reconnect...");
            setTimeout(() => {
                try {
                    if (this.peer && !this.peer.destroyed && this.peer.disconnected) {
                        this.peer.reconnect();
                    }
                } catch (e) {
                    console.error("Reconnection failed", e);
                }
            }, 1000);
        });
    }

    connectToPeer(remoteId: string, metadata?: any) {
        if (!this.peer) return;
        const conn = this.peer.connect(remoteId, { metadata });
        this.setupConnection(conn);
    }

    sendDeclineRequest(remoteId: string, metadata?: any) {
        if (!this.peer) return;
        const conn = this.peer.connect(remoteId, { metadata });
        conn.on('open', () => {
            setTimeout(() => conn.close(), 1000);
        });
    }

    setupConnection(conn: DataConnection) {
        // If we already have a connection, don't let a new one overwrite it immediately
        if (this.connection && this.connection.open && this.connection.peer !== conn.peer) {
            return;
        }

        this.connection = conn;

        const handleOpen = () => {
            if (this.onConnected) this.onConnected();
        };

        if (conn.open) {
            handleOpen();
        } else {
            conn.on('open', handleOpen);
        }

        conn.on('data', (data: any) => {
            if (this.onMessage) {
                this.onMessage(data as IncomingMessage);
            }
        });

        conn.on('close', () => {
            if (this.onDisconnected) this.onDisconnected();
            this.connection = null;
        });

        conn.on('error', () => {
            if (this.onDisconnected) this.onDisconnected();
            this.connection = null;
        });
    }

    sendMessage(msg: IncomingMessage) {
        if (this.connection && this.connection.open) {
            this.connection.send(msg);
        }
    }

    startCall(remoteId: string, stream: MediaStream, onRemoteStream: (stream: MediaStream) => void, options?: any): MediaConnection | null {
        if (!this.peer) return null;
        this.localStream = stream;
        const call = this.peer.call(remoteId, stream, options);
        this.callConnection = call;
        if (call) {
            call.on('stream', onRemoteStream);
        }
        return call;
    }

    endCall(stopTracks = true) {
        if (this.callConnection) {
            this.callConnection.close();
            this.callConnection = null;
        }
        if (stopTracks && this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        if (this.onCallEnded) this.onCallEnded();
    }

    disconnectChat() {
        if (this.connection) {
            this.connection.close();
            this.connection = null;
        }
        this.endCall(true);
    }

    destroy() {
        this.disconnectChat();
        if (this.peer) {
            this.peer.destroy();
            this.peer = null;
        }
    }
}

export const peerEngine = new PeerEngine();
