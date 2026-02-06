export interface BhavaEffectsInterface {
    allHouseEffects: AllHouseEffectInterface[];
    zeroProportion: number;
    proportions: number[];
    generalEffects: string[];
}

export interface AllHouseEffectInterface {
    houseNumber: number;
    theme: string;
    comments: string;
    effects: string[];
}

export interface BhavaEffectsReqBodyInterface {
    ascendant: string;
    suryaPlacement: string;
    budhaPlacement: PlacementInterface;
    shukraPlacement: PlacementInterface;
    chandraPlacement: string;
    chandraWaxing: boolean;
    rahuPlacement: string;
    ketuPlacement: string;
    kujaPlacement: PlacementInterface;
    guruPlacement: PlacementInterface;
    shaniPlacement: PlacementInterface;
    budhaUnafflicted: boolean;
    nascendant: string;
    nsuryaPlacement: string;
    nbudhaPlacement: string;
    nshukraPlacement: string;
    nchandraPlacement: string;
    nrahuPlacement: string;
    nketuPlacement: string;
    nkujaPlacement: string;
    nguruPlacement: string;
    nshaniPlacement: string;
    firstHalf: boolean;
}

export interface PlacementInterface {
    placement: string;
    combustion: boolean;
}
