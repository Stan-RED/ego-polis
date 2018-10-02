using Codesophy.Content;
using Codesophy.Model;

namespace Codesophy.Security
{
    /// <summary>
    /// Person information.
    /// </summary>
    public class Person : IArtifact
    {
        /// <summary>
        /// Uniuely identify person.
        /// </summary>
        ArtifactId IHasId<ArtifactId>.Id { get; }
    }
}
