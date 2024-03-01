import express from 'express';
import { getAllUser, register, login, /* specialuser, updateUser, deleteUser */ getMyProfile, logout} from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get("/all", getAllUser);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated , getMyProfile)
//router.get("/userid/special", specialuser);

/* router
    .route("/userid/:id")
    .get(getUserDetail)
    .put(updateUser)
    .delete(deleteUser)
 */
/* below code is for understanding of above code
router.get("/userid/:id", getUserDetail);

router.put("/userid/:id", updateUser);

router.delete("/userid/:id", deleteUser);
 */
export default router;