interface IToken {
    token_type: string
    access_token: string
    is_loaded: boolean
    is_logged_in: boolean
}

interface ICredentials {
    employee_email: string,
    employee_password: string
}

interface IRegion {
    region_id: number,
    region_name: string,
    created_at: Date,
    updated_at?: Date
}

interface IRegionData extends IRegion {
    is_loaded: boolean
}

interface IRegionsData {
    regions: IRegion[],
    is_loaded: boolean
}