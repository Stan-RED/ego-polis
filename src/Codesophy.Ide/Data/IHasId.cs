using Codesophy.Model;

namespace Codesophy.Data
{
    /// <summary>
    /// Defining model with unique object identifier.
    /// </summary>
    /// 
    /// <remarks>
    /// TODO: Supposingly our ID will be encoded in
    /// <see cref="System.Uint64"/>, but maybe it will be interesting
    /// and performance ssafe to have it in struct?
    /// </remarks>
    public interface IHasId
        : IHasId<uint>
    {

    }
}
