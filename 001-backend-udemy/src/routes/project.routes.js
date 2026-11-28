import { Router } from "express";
import {
    getProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMembersToProject,
    getProjectMembers,
    updateMemberRole,
    deleteMember
} from "../controllers/project.controllers.js";
import { createProjectValidator, addMemberToProjectValidator } from "../validators/index.js";
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getProject).post(createProjectValidator(), validate, createProject);
router.route("/:projectId")
    .get(validateProjectPermission(AvailableUserRole), getProjectById)
    .put(validateProjectPermission(
        [UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]
    ), createProjectValidator(), validate, updateProject)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

router.route("/:projectId/members")
    .get(getProjectMembers)
    .post(validateProjectPermission(
        [UserRolesEnum.ADMIN]
    ), addMemberToProjectValidator(), validate, addMembersToProject);

router.route("/:projectId/members/:userId")
    .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRole)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRole);

export default router;
