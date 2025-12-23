
//সেটা জাভাস্ক্রিপ্টে একটি cookie configuration object

export const cookieOptions = {
    httpOnly: true,
    // In production keep secure=true and sameSite=Lax; for local dev allow cross-site cookies
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "Lax" : "None",
    maxAge: 1000 * 60* 5 // 5 minutes
}