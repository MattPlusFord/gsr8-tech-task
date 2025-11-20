import HeroCard from "../../components/cards/HeroCard.tsx";
import './landing.css';
import {useEffect, useState} from "react";
import UserClient from "../../api/user/userClient.ts";
import Card from "../../components/cards/Card.tsx";
import {User} from "../../types/users.ts";
// import {AccountList} from "../../components/accountList/AccountList.tsx";
import BasePage from "../../components/layout/basePage/BasePage.tsx";


export const LandingPage = () => {
    const [user, setUser] = useState<undefined|User>();
    const [userLoadError, setUserLoadError] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            UserClient.loadUser().then(userData => {
                if (userData) {
                    setUser(userData);
                } else {
                    setUserLoadError(true);
                }
            });
        }
    }, [user]);

    const renderPageBody = () => {
        if (user) {
            return (
                    <div className="home">
                        <HeroCard userName={user?.name ? user.name : ""} />
                        {/*<AccountList />*/}
                    </div>
            );
        } else if (userLoadError) {
            return (
                    <div className="home">
                        <Card>
                            <h1>Sorry, we've been unable to find your user account</h1>
                        </Card>
                    </div>
            );
        } else {
            return (
                    <div className="home">
                        <Card>
                            <h1>Loading</h1>
                        </Card>
                    </div>
            );
        }
    }

    return (
      <BasePage>
          {renderPageBody()}
      </BasePage>
    );
}

export default LandingPage;