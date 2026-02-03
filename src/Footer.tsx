


export const Footer = () => {

    return (
        <footer className="footer">
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <button className="neobrutal-btn">
                    Lista Gols
                </button>
                <button disabled={true} className="neobrutal-btn">
                    Escalação
                    <br/>
                    (Em breve)
                </button>
            </div>
        </footer>
    )   
}