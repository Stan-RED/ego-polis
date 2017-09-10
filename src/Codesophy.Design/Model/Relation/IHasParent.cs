namespace Codesophy.Model.Relation
{
    /// <summary>
    /// TODO:Defines that parental relation between instances.
    /// </summary>
    /// <typeparam name="TParent"></typeparam>
    /// TODO:We can also add IHasChildren and may some ITree interface that is IHasParent+IHasChild.
    /// TODO:Also we can define interfaces for siblings and build a linked list on it.
    public interface IHasParent<TParent>
    {
        TParent Parent { get; }
    }
}
