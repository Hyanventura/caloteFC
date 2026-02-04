
export const Header = () => {
    return (
        <header className="header">
            <h3 className="title" style={{ display: 'flex', justifyContent:"center", alignItems: "center", padding: '10px' }}>
            <img 
                style={{ 
                    height: 100, 
                    width: 100,
                }} 
                src="./public/caloteLogo.png" 
                alt="Calote FC Logo"
            />
                CALOTE FC 
            </h3>
        </header>
    )
}
