using Codesophy.Process;

namespace Codesophy.Configuration
{
    /// <summary>
    /// TODO:Responsible for providing settings returning <see cref="ISetting{TValue}"/>
    /// for the provided setting <typeparamref name="TKey"/>.
    /// </summary>
    /// <typeparam name="TKey"></typeparam>
    /// <typeparam name="TValue"></typeparam>
    /// 
    /// <remarks>
    /// TODO:For providers like registry we can implement nultiple
    /// <see cref="ISettingProvider{TKey, TValue}"/> contracts for each type (DWORD, string, bin).
    /// </remarks>
    public interface ISettingProvider<TKey, TValue>
        : IFactory<TKey, ISetting<TValue>>
    {
        
    }
}
