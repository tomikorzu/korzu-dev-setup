import Navbar from "../Navbar/Navbar.component";

interface InterfaceWrapperProps {
    children: React.ReactNode;
}

const InterfaceWrapper: React.FC<InterfaceWrapperProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default InterfaceWrapper;