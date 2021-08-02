import express, { Request, Response, NextFunction } from "express";
import { SuccessMsgResponse, SuccessResponse} from "../../core/responses/response.API";
import { ApiError, InternalError } from "../../core/responses/response.ERR"



/*
    SMS 
    routing source :: /sms
*/

function generatePassword() {
    const codeTable = '0123456789'
    let code = ''
    for (let i = 0; i < 4; i++) {
        code += codeTable[Math.floor(Math.random() * codeTable.length)]
    }
    return code
}

const testRouter = express.Router()

testRouter.get('/success',
    async function (req: Request, res: Response, next: NextFunction) {
        new SuccessResponse('success with Data', { data: 'data' }).send(res)
    }
)

testRouter.get('/msg',
    async function (req: Request, res: Response, next: NextFunction) {
        new SuccessMsgResponse('success').send(res)
    }
)

testRouter.get('/failure',
    async function (req: Request, res: Response, next: NextFunction) {
        ApiError.handle(new InternalError(), res)
    }
)


export default testRouter