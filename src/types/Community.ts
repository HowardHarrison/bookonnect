export interface Contact {
    id: number;
    user_name: string;
    profile_url: string;
    last_sender: string;
    last_message: string;
    last_message_at: string;
    unseen_count: number;
}

export interface ContactListType {
    status: number;
    message: string;
    data: Contact[];
}

export interface FileWithPreview {
    file: File;
    preview: string;
}

export interface ChatMessage {
    id: number,
    type: 'user' | 'group',
    from_id: number,
    to_id: number,
    body: string,
    content_type: string,
    attachment: string,
    seen: 1 | 0,
    created_at: string,
    updated_at: string
}