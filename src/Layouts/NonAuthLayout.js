import React, { useEffect } from 'react';
import withRouter from '../Components/Common/withRouter';

//redux
import { useSelector } from "react-redux";

const NonAuthLayout = ({ children }) => {
    const {
        layoutModeType,
    } = useSelector(state => ({
        layoutModeType: state.Layout.layoutModeType,
    }));

    useEffect(() => {
        if (layoutModeType === "light") {
            document.body.setAttribute("data-layout-mode", "light");
        } else {
            document.body.setAttribute("data-layout-mode", "dark");
        }
        return () => {
            document.body.removeAttribute("data-layout-mode")
        }
    }, [layoutModeType]);
    return (
        <div>
            {children}
        </div>
    );
};

export default withRouter(NonAuthLayout);