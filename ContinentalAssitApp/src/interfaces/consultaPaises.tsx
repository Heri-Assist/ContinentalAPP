
export interface ConsultaPaises {
    resultado: Paises[];
    cantidad:  number;
    error:     boolean;
}

export interface Paises {
    id:           number;
    name:         string;
    alpha2Code:   string;
    alpha3Code:   string;
    capital:      string;
    region:       string;
    subregion:    string;
    population:   string;
    demonym:      string;
    area:         string;
    gini:         null;
    nativeName:   string;
    numericCode:  string;
    flag:         string;
    callingCodes: string;
    latlong:      string;
    timezone:     string;
    de:           string;
    es:           string;
    fr:           string;
    ja:           string;
    it:           string;
    br:           string;
    pt:           string;
    nl:           string;
    hr:           string;
    fa:           string;
    status:       string;
}
