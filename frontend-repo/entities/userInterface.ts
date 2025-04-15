export interface UserTypes {
 id: string,
 name: string,
 numberOfRents: string;
 totalAverageWeightRatings: string;
 recentlyActive: Date,
}


export interface UserState {
 loading: boolean;
 user: UserTypes[];
 error: string;
 token: string | null;
 userData: UserTypes;
}

