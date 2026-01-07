using Microsoft.AspNetCore.SignalR;

namespace backendchatt.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly Dictionary<string, UserConnection> _connections = new();

        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            _connections[Context.ConnectionId] = conn;
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
            
            await Clients.Group(conn.ChatRoom)
                .SendAsync("JoinSpecificChatRoom", "Admin", $"{conn.UserName} has joined {conn.ChatRoom}");
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                await Clients.Group(userConnection.ChatRoom)
                    .SendAsync("ReceiveSpecificMessage", userConnection.UserName, message);
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
                await Clients.Group(userConnection.ChatRoom)
                    .SendAsync("JoinSpecificChatRoom", "Admin", $"{userConnection.UserName} has left {userConnection.ChatRoom}");
            }
            await base.OnDisconnectedAsync(exception);
        }
    }

    public class UserConnection
    {
        public string UserName { get; set; } = string.Empty;
        public string ChatRoom { get; set; } = string.Empty;
    }
}