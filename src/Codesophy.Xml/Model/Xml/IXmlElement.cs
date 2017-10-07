using Codesophy.Model.Relation;

namespace Codesophy.Model.Xml
{
    /// <summary>
    /// TODO:
    /// </summary>
    /// <remarks>
    /// TODO:IHasChildren? Inherits from XmlNode?
    /// TODO:IHasName/IShemaName that may be shared with SQL?
    /// </remarks>
    public interface IXmlElement
        : IHasParent<IXmlElement>
    {

    }
}
