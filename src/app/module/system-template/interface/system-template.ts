export interface systemTemplate {
    name: string;
    json?: any;
    header?: any;
    body: any;
    footer?: any;
    idSystemOrientation: number;
    idSystemSize: number;
    headerSpacing?: number;
    footerSpacing?: number;
    idSystemFrontPage?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    script?: string;
    paginate?: number;
}
