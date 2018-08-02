using System;
using System.Reflection;

namespace Codesophy.Cli
{
    class Program
    {
        static void Main(string[] args)
        {
            //TODO:
            var name = Assembly.GetEntryAssembly().GetName();
            Console.WriteLine($"Codesophy CLI {name.Version}");
        }
    }
}
