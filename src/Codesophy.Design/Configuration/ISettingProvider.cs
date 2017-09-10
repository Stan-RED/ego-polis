namespace Codesophy.Configuration
{
    /// <summary>
    /// TODO:Responsible for providing settings returning <see cref="ISetting{TValue}"/>
    /// for the provided setting <typeparamref name="TKey"/>.
    /// </summary>
    /// <typeparam name="TKey"></typeparam>
    /// <typeparam name="TValue"></typeparam>
    public interface ISettingProvider<TKey, TValue>
    {
        ISetting<TValue> Get(TKey key);
    }
}
