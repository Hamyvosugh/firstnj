export interface Todo {
    id: number;
    task: string;
    status: string;
    user_id?: number;
    inserted_at?: Date;
    updated_at?: Date;
}