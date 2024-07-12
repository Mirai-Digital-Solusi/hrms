export interface Database {
    public: {
      Tables: {
        employees: {
          Row: {               // the data expected from .select()
            id: number
            name: string
            gender: string
            job: string
            status: string
          }
          Insert: {            // the data to be passed to .insert()
            id?: never         // generated columns must not be supplied
            name: string
            gender: string       // `not null` columns with no default must be supplied
            job: string
            status: string // nullable columns can be omitted
          }
          Update: {            // the data to be passed to .update()
            id?: never
            name?: string      // `not null` columns are optional on .update()
            gender?: string
            job?: string
            status?: string
          }
        }
      }
    }
  }