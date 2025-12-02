import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { plainToInstance } from "class-transformer";

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  content!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;

  timestamp!: number;
}

export function validateMessageDto(payload: unknown) {
  const instance = plainToInstance(MessageDto, payload);
  return (async () => {
    const { validate } = await import("class-validator");
    const errors = await validate(instance as any);
    return { valid: errors.length === 0, errors, value: instance };
  })();
}
