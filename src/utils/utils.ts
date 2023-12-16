export function isProduction() : boolean{
    const env = process.env.NODE_ENV;
    return env === "production"
}