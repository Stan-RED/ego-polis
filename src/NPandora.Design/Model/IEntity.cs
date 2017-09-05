namespace NPandora.Model
{
    /// <summary>
    /// This interface is responsible for model -> entity dependency declaration.
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    /// <remarks>
    /// <para>
    /// Among different kind of models (view-models, request-models, etc.) there is one
    /// vital, but mostly hidden group - entities. They are responsible for the physical
    /// representation of the objects. How they are stored (in memory, XML file, database).
    /// </para>
    /// 
    /// <para>
    /// All other types of models are dependent from entities. For example, request models
    /// may contain initial information for the new entity or its updates. View models may
    /// contain partial information from the entity or combine data from multiple entitites.
    /// </para>
    /// 
    /// <para>
    /// This interface uses <typeparamref name="TEntity"/> parameter to define, which
    /// entity the current model depends on. If type is self-referenced, then it's
    /// definitely an entity.
    /// </para>
    /// 
    /// TODO:Name of the genric parameter can be used as name to sync with other generic
    /// templates and stored in some static IEntityExtensions property. IsEntity extension?
    /// </remarks>
    public interface IEntity<TEntity>
    {

    }
}
