import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { ERoleNames } from "src/interfaces/ERoleNames";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/guards/roles.guard";

export function Authorization(role: ERoleNames, ...roles: ERoleNames[]) {
    return applyDecorators(
        Roles(role, ...roles),
        UseGuards(AuthGuard('jwt'), RolesGuard)
    )
}