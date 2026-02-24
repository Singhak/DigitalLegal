export interface Case {
    _id?: string;
    caseNumber: string;    // Matches MongoDB 'caseNumber'
    clientName: string;    // Matches MongoDB 'clientName'
    cnrNumber: string;     // Matches MongoDB 'cnrNumber'
    forum: string;         // e.g., 'Delhi High Court'
    currentStage: string;  // e.g., 'Evidence'
    nextHearingDate: string; // ISO Date string from MongoDB
    time?: string;         // Optional: if your DB stores hearing time
}