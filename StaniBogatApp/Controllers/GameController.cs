using Microsoft.AspNetCore.Mvc;

namespace StaniBogatApp.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}