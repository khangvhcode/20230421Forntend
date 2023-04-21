export interface OrderElement {
    id: number;
    version: number;
    name: string;
    description: string;
    code: string;
    initDate: Date;
    deadline: Date;
    lastAdvanceMeasurementForSpreading: number;
    dirtyLastAdvanceMeasurementForSpreading: boolean;
    parent: number;
    template: number;
    externalCode: string;
    positionInContainer: number;
  };