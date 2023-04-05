import {Request, Response, NextFunction} from "express"
import nacl from "tweetnacl"

class Security {
	public static verify(req: Request, res: Response, next: NextFunction) {
		const signature = req.get("X-Signature-Ed25519")
		const timestamp = req.get("X-Signature-Timestamp")

		if(!signature || !timestamp)
			return res.status(400).send("")

		const verified = nacl.sign.detached.verify(
			Buffer.from(timestamp + req.rawBody),
			Buffer.from(signature, "hex"),
			Buffer.from(process.env.PUBLIC_KEY, "hex")
		)

		if(!verified)
			return res.status(401).send("")

		return next()
	}
}

export default Security