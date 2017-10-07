namespace Codesophy.Process
{
    /// <summary>
    /// TODO:Factory is almost a starting point of application's models.
    /// </summary>
    /// 
    /// <remarks>
    /// 
    /// <para>
    /// TODO:It's SRP. We remove creation responsibility from classes.
    /// </para>
    /// 
    /// <para>
    /// TODO:
    /// Frequently we come across interfaces like IDependencyResolver to get
    /// the instance for some particular type. But such naming looks weird,
    /// because these interfaces usually don't know anything about
    /// dependencies. They act just like factory. Getting some type as
    /// input and returning a constructed instance of this type.
    /// 
    /// Internally such factories may use dependency injectors, but this is
    /// specific responsibility of some factories types.
    /// </para>
    /// 
    /// </remarks>
    public interface IFactory<TType, TInstace>
        : IProcess<TType, TInstace>
    {

    }
}
