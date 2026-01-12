const MessageContainer = ({ messages }) => {
    return (
        <div style={{ height: '400px', overflowY: 'scroll' }}>
            {messages.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <tbody>
                        {messages.map((msg, index) => (
                            <tr key={index}>
                                <td>{msg.userName} - {msg.msg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-muted text-center p-3">
                    Inga meddelanden än. Starta konversationen!
                </div>
            )}
        </div>
    );
};

export default MessageContainer;