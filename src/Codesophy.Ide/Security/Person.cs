using Codesophy.Content;
using Codesophy.Model;
using Codesophy.Model.Relation;

namespace Codesophy.Security
{
    /// <summary>
    /// Person information.
    /// </summary>
    public class Person : IArtifact
    {
        ArtifactId IHasId<ArtifactId>.Id { get; }
        ArtifactId? IAdjacent<ArtifactId>.Parent => throw new System.NotImplementedException();
    }
}
