using Codesophy.Model;

namespace Codesophy.Content
{
    /// <summary>
    /// Defining term used to organized controlled vocabulary of some
    /// <see cref="Workspace"/>.
    /// </summary>
    /// 
    /// <remarks>
    /// <para>
    ///     In DDD is fequently used a term "ubiquitous language".
    ///     Collection of <see cref="Term">terms</see> is some particular
    ///     workspace defines such language.
    /// </para>
    /// 
    /// TODO:Not sure that this is a good namespace for it.
    /// TODO:It may implement some high level interface like ITerm, that
    /// maybe also like KeyValuePair&lt;TKey, TValue&gt;.
    /// TODO:If users are usually mentioned by "@" symbol in UI, for
    /// terms we can also use some symbol to mention a specific term
    /// we're referencing. Or doing this automatically for all words.
    /// TODO:In UI it can be presented with A..Z tabs for natural
    /// navigation.
    /// </remarks>
    public class Term
        : IArtifact
    {
        ArtifactId IHasId<ArtifactId>.Id => throw new System.NotImplementedException();
    }
}
