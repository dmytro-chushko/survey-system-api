import { SetMetadata } from "@nestjs/common";
import { USER_ROLE } from "src/modules/user/types/user.types";
import { ROLES_KEY } from "src/utils/consts";

export const Roles = (role: USER_ROLE) => SetMetadata(ROLES_KEY, role);
