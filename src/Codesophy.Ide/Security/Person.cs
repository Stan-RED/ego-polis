using Codesophy.Data;
using Codesophy.Model;

namespace Codesophy.Security
{
    /// <summary>
    /// Defining a person.
    /// </summary>
    public class Person : IHasId
    {
        /// <summary>
        /// Uniuely identify person.
        /// </summary>
        uint IHasId<uint>.Id { get; }
    }
}
