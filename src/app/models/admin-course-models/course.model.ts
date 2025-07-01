export interface Courses {
    id?: number;
    title: string;
    imageUrl?: string;
    modality: 'PRESENCIAL' | 'VIRTUAL';
    certification: string; 
    duration: string;    
    description: string;    
    price: number;
}
