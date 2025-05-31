export interface EmailData {
    To: string;
    Subject: string;
    Body: string;
}

export interface EmailResponse {
    success: boolean;
    message: string;
}