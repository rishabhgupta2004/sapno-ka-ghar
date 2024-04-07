const User=require("../models/user")
module.exports.rendersignup=  (req, res) => {
    res.render("user/signup.ejs");
};


module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({ email, username });
        const registeruser = await User.register(newuser, password);
        req.login(registeruser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to the Sapno Ka Ghar!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};
module.exports.renderlogin=(req, res) => {
    res.render("user/login.ejs");
};
module.exports.login=async(req,res)=>{
    req.flash("success", "Welcome to Sapno Ka Ghar! You are logged in.");
    const redirectUrl = res.locals.redirecturl ||"\listings" // Use default redirect URL if res.locals.redirecturl is not set
    res.redirect(redirectUrl);
};

module.exports.logout= (req, res, next) => {
    req.logout((err)=>{
        if(err){
            return next(err)
        }
    req.flash("success", "You are logged out");
    res.redirect("/listings");
});
}
