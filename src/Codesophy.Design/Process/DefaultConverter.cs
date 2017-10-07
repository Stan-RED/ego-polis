#if !NETSTANDARD1_3
using System;
using System.ComponentModel;

namespace Codesophy.Process
{
    /// <summary>
    /// TODO:Default <see cref="IConvert{TSource, TDestination}">conversion</see>
    /// implementation using <see cref="TypeDescriptor.GetConverter(Type)"/>.
    /// </summary>
    /// <typeparam name="TSource"></typeparam>
    /// <typeparam name="TDestination"></typeparam>
    public class DefaultConverter<TSource, TDestination>
        : IConvert<TSource, TDestination>
    {
        #region -- IFeature interface --------------------------------------------------------------
        /// <summary>
        /// TODO: inheritdoc or customized description?
        /// </summary>
        /// <param name="given"></param>
        /// <returns></returns>
        TDestination IProcess<TSource, TDestination>.When(TSource given)
        {
            var converter = TypeDescriptor.GetConverter(typeof(TDestination));

            // TODO:If no converter? If not converter.CanConvertFrom? Exception or configurable
            // behaviour?

            return (TDestination)converter.ConvertFrom(given);
        }
        #endregion ---------------------------------------------------------------------------------
    }
}
#endif