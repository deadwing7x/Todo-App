using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Todo_App.Models;
using Todo_App.Services;

namespace Todo_App.Controllers
{
    public class ItemsController : Controller
    {
        private readonly ICosmosDbService _cosmosDbService;
        public ItemsController(ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }

        [HttpGet]
        [Route("Items/GetTasksAsync")]
        public async Task<IEnumerable<Item>> GetTasksAsync()
        {
            return await _cosmosDbService.GetItemsAsync("SELECT * FROM c");
        }

        [HttpGet]
        [Route("Items/GetActiveTasksAsync")]
        public async Task<IEnumerable<Item>> GetActiveTasksAsync()
        {
            return await _cosmosDbService.GetItemsAsync("SELECT * FROM c WHERE c.isComplete = false");
        }

        [HttpGet]
        [Route("Items/GetCompletedTasksAsync")]
        public async Task<IEnumerable<Item>> GetCompletedTasksAsync()
        {
            return await _cosmosDbService.GetItemsAsync("SELECT * FROM c WHERE c.isComplete = true");
        }

        [HttpPost]
        [Route("Items/CreateAsync")]
        public async Task<Item> CreateAsync([FromBody] JsonElement task)
        {
            Item item = JsonConvert.DeserializeObject<Item>(task.ToString());
            if (ModelState.IsValid)
            {
                item.Id = Guid.NewGuid().ToString();
                await _cosmosDbService.AddItemAsync(item);
                return item;
            }

            return item;
        }

        [HttpPost]
        [Route("Items/EditAsync")]
        public async Task<Item> EditAsync([FromBody] JsonElement task)
        {
            Item item = JsonConvert.DeserializeObject<Item>(task.ToString());
            if (ModelState.IsValid)
            {
                await _cosmosDbService.UpdateItemAsync(item.Id, item);
                return item;
            }

            return item;
        }

        [HttpPost]
        [Route("Items/DeleteConfirmedAsync")]
        public async Task<HttpStatusCode> DeleteConfirmedAsync([FromBody] JsonElement task)
        {
            try
            {
                Item item = JsonConvert.DeserializeObject<Item>(task.ToString());
                await _cosmosDbService.DeleteItemAsync(item.Id);
                return HttpStatusCode.OK;
            }
            catch
            {
                return HttpStatusCode.BadRequest;
            }
        }

        [HttpPost]
        [Route("Items/DeleteAllAsync")]
        public async Task<HttpStatusCode> DeleteAllAsync([FromBody] IEnumerable<JsonElement> tasks)
        {
            try
            {
                foreach(var task in tasks)
                {
                    Item item = JsonConvert.DeserializeObject<Item>(task.ToString());
                    await _cosmosDbService.DeleteItemAsync(item.Id);
                }
                return HttpStatusCode.OK;
            }
            catch
            {
                return HttpStatusCode.BadRequest;
            }
        }

        [HttpGet]
        public async Task<Item> DetailsAsync(string id)
        {
            return (Item)await _cosmosDbService.GetItemAsync(id);
        }
    }
}
