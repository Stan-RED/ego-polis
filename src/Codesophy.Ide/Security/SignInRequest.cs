namespace Codesophy.Ide.Security
{
    /// <todo>
    /// Primitive sample. Later interface with identity+security token
    /// and different implementations (different authentications) can
    /// be considered. 
    /// </todo>
    public class SignInRequest
    {
        public string Login { get; set; }
        
        public string Password { get; set; }
    }
}
