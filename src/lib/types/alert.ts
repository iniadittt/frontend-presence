export enum Service {
    'users',
    'presences',
    'reports'
}

export interface AlertType { buttonType: string; name: string, title: string, description: string, service: Service, id: number, isTabel?:boolean };

