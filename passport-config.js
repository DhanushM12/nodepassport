const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
function initialize(passport, getUserByEmail, getUserById){
    const authenticatedUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(user == null){
            return done(null, false, {message: 'No user with the email'});
        }
        try {
            if(await bcrypt.compare(password, user.password))
            {
                return done(null, user);
            }
            else
            {
                return done(null, false,{message: 'Password incorrect'})
            }
        } catch (error) {
            return done(error);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticatedUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.derializeUser((id, done)=> {
        return done(null, getUserById(id));
    })
}

module.exports = initialize;