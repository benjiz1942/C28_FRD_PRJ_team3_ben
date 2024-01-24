import { IsString } from "class-validator";

export class studyNowDto {
    cardId: number;

    @IsString()
    performance: string;
}
