export const phoneMask = (v:string) => {
    if (!v) return ""
    v = v.replace(/\D/g,'')
    v = v.replace(/(\d{2})(\d)/,"($1) $2")
    v = v.replace(/(\d)(\d{4})$/,"$1-$2")
    return v
    }
    