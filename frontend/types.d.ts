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

interface IStore
{
    store_name: string,
    store_location: string,
    created_at: Date,
    updated_at?: Date
    region_id: number
    store_id: number
}

interface IStoreData extends IStore 
{
    is_loaded: boolean
}

interface IStoresData
{
    stores: IStore[],
    is_loaded: boolean
}