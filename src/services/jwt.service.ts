import jwt from "jsonwebtoken";

class JWTService {
  private static instance: JWTService;
  private secretKey: string;

  private constructor() {
    this.secretKey = process.env.JWT_SECRET || "default_secret_key";
  }

  public static getInstance(): JWTService {
    if (!JWTService.instance) {
      JWTService.instance = new JWTService();
    }
    return JWTService.instance;
  }

  public generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: 3 * 24 * 3600 }); // 3 days
  }

  public verifyToken(token: string): object | string {
    return jwt.verify(token, this.secretKey);
  }
}

export default JWTService.getInstance();
